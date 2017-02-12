const mongoose = require('mongoose')
const Schema = mongoose.Schema

const colors = ['white', 'black', 'orange', 'blue', 'green', 'yellow', 'purple', 'red', 'pink']

const ListSchema = new Schema({
  name: { type: String, required: true },
  pos: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now() }
})

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  backgroundColor: {
    type: String,
    lowercase: true,
    enum: colors,
    default: colors[0] // default white
  },
  ownerId: { type: Schema.Types.ObjectId, required: true },
  lists: [ListSchema],
  team: [{
    userId: { type: Number },
    joinedAt: Date,
    role: [{ type: String, enum: ['admin', 'dev'] }]
  }]
}, { timestamps: true })

/**
 * Hook used to create a default number of lists whenever a new project is added
 */
ProjectSchema.pre('save', function (next) {
  const project = this
  if (project.isNew) {
    project.lists = [
      { pos: 0, name: 'To Do' },
      { pos: 1, name: 'Doing' },
      { pos: 2, name: 'Done' }
    ]
  }
  next()
})

ProjectSchema.statics = {

  /**
   * Get the project of specific user. A user may only access his own projects.
   * That's why in addition to the project's id it is also necessary to pass
   * the user's id to ensure that constraint
   * @param id project's id
   * @param ownerId user's id
   *
   * TODO: Allow a user to access projects that have been shared with him.
   */
  get (id, ownerId) {
    return this.findOne({ _id: id, ownerId })
      .exec()
      .then((project) => {
        if (project) return project

        let error = new Error('No such project exists!')
        error.status = 404
        return global.Promise.reject(error)
      })
  },

  /**
   * Find all project of a user given his id and returns
   * a list of projects in descendant order by default.
   * @param ownerId owner's id
   * @param orderBy the order in which the registers should be returned.
   *        1 for asc and -1 for desc. Order desc is default.
   */
  findByOwnerId (ownerId, orderBy = -1) {
    return this.find({ ownerId })
      .sort({ updatedAt: orderBy })
      .exec()
  }

}

module.exports = mongoose.model('Project', ProjectSchema)
