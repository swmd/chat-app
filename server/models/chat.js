class ChatModel {
    constructor(db, ObjectId) {

        this.findByDate = async (date) => {
            return await this.Messages.find({ creatAt: { $gt: date } }).toArray();
        }

        this.insertMessage = async fields => {
            const { insertedId } = await this.Messages.insertOne(fields);
            return insertedId;
        };

        if (!db) {
            throw new Error('DB is required.');
        }
        this.db = db;
        if (!ObjectId) {
            throw new Error('ObjectId is required.');
        }

        this.ObjectId = ObjectId;
        this.Messages = this.db.collection('messages');
    }

}

module.exports = ChatModel;