import app from './configs/App';
import dotenv from 'dotenv';
import { mongoDbConnect } from './configs/Database';
dotenv.config();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI as string;
const mongoDatabaseName = process.env.MONGODB_DBNAME as string;

app.listen(port, () => {
	mongoDbConnect(mongoUri, mongoDatabaseName);
	console.log(`Server is running on http://localhost:${port}`);
});
