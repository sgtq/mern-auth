import mongoose from "mongoose";

const connect = async () => {
    try {
        const MONGO_USER = process.env.MONGO_USER;
        const MONGO_PASS = process.env.MONGO_PASS;
        const MONGO_COLL = process.env.MONGO_COLL || "";
        const conn = await mongoose.connect(
            `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.u8grphl.mongodb.net/${MONGO_COLL}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch (err) {
        console.error(err);
        throw err;
    }
};

mongoose.connection.on("disconnected", () => {
    console.error("Mongo Database", "DISCONNECTED!".red);
});
mongoose.connection.on("connected", () => {
    console.log("Connected".green, "to", "Mongo Database!".cyan);
});

export default connect;
