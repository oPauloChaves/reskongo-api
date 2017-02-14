const mongoose = require('mongoose')
const { COLORS, ROLES } = require('./constants')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  name: { type: String, required: true },
  pos: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now() }
})

// _id = user's _id
const MemberSchema = new Schema({
  owner: Boolean, // only the user who creates the project has this value set to true
  joinedAt: { type: Date, required: true, default: Date.now() },
  role: {
    type: String,
    required: true,
    enum: ROLES,
    'default': ROLES[1]
  }
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
    enum: COLORS,
    default: COLORS[0] // default white
  },
  ownerId: { type: Schema.Types.ObjectId, required: true },
  lists: [ListSchema],
  team: [MemberSchema]
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

    // Add the project's owner as a member in its own project
    project.team = [{
      _id: project.ownerId,
      owner: true,
      role: 'ADMIN'
    }]
  }
  next()
})

ProjectSchema.statics = {

  /**
   * Find the project given the project's id and user's id. A user may only access projects
   * in which he is a member. To fulfill this requirement, query a project by id and check if the
   * userId is in the members array.
   * @param projId project's id
   * @param userId user's id
   *
   * TODO: Allow a user to access projects that have been shared with him.
   */
  get (projId, userId) {
    return this.findOne({ _id: projId, 'team._id': userId })
      .exec()
      .then((project) => {
        if (project) return project

        let error = new Error('No such project exists!')
        error.status = 404
        return global.Promise.reject(error)
      })
  },

  /**
   * Find all projects where the current user is a member in. Returns
   * a list of projects in descendant order by default.
   *
   * @param userId user id
   * @param orderBy the order in which the registers should be returned.
   *        1 for asc and -1 for desc. Order desc is default. Ordered by last updated (updatedAt)
   */
  findByOwnerId (userId, orderBy = -1) {
    return this.find({ 'team._id': userId })
      .sort({ updatedAt: orderBy })
      .exec()
  }

}

module.exports = mongoose.model('Project', ProjectSchema)
