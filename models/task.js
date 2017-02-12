const mongoose = require('mongoose')
const Project = require('./project')
const Schema = mongoose.Schema

const colors = ['white', 'black', 'orange', 'blue', 'green', 'yellow', 'purple', 'red', 'pink']

const ChecklistSchema = new Schema({
  title: String,
  list: [{
    text: String,
    done: Boolean
  }],
  createdAt: { type: Date, default: Date.now() }
})

const CommentSchema = new Schema({
  text: { type: String, required: true },
  ownerId: Schema.Types.ObjectId
}, { timestamps: true })

const AttachementSchema = new Schema({
  path: { type: String, required: true }, // file path destination
  filename: { type: String, required: true }, // original file name
  uploadedAt: { type: Date, default: Date.now() },
  uploadedBy: Schema.Types.ObjectId // user (task member) who uploaded the file
})

const TaskSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String },
  checklists: [ChecklistSchema],
  // TODO default create a task in the first list of the project
  listId: { type: Schema.Types.ObjectId },
  projectId: { type: Schema.Types.ObjectId, required: true },
  createdBy: { type: Schema.Types.ObjectId, required: true },
  labels: [{
    color: { type: String, enum: colors },
    text: { type: String }
  }],
  dueDate: { type: Date },
  comments: [CommentSchema],
  members: [Schema.Types.ObjectId],
  attachments: [AttachementSchema],
  archived: Boolean,
  deleted: Boolean
}, { timestamps: true })

TaskSchema.statics = {

  /**
   * Find all tasks of a project
   * @param projectId The tasks project id
   * @param userId The users id
   */
  findProjectTasks (projectId, userId) {
    return Project.get(projectId, userId)
      .then(project => {
        return this.find({ projectId })
          .exec()
      })
  }

}

module.exports = mongoose.model('Task', TaskSchema)
