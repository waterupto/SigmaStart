import db from "../../loaders/database";

export default async (req, res): Promise<void> => {
    try {
        let collection = (await db()).collection('projectInfo');

        // Action 1: Get all data
        // Action 2: Get data by address
        switch (req.body.action) {
            case 1:
                let data = await collection.find({}).toArray();
                return res.send(data);
            
            case 2:
                data = await collection.findOne({ address: req.body.address });
                return res.send(data);
            default:
                return res.send('Invalid action');
        }
        
    } catch (error) {
        return res.send(error);
    }
};