import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destinationFolder;
        switch(file.fieldname) {
            case "profile":
                destinationFolder = "./src/uploads/profiles";
                break;
            case "products":
                destinationFolder = "./src/uploads/products";
                break;
            case "document":
                destinationFolder = "./src/uploads/documents";
                break;      
        }
        cb(null, destinationFolder)
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.').pop(); // Extrae la extensión del archivo
        cb(null, file.fieldname + '.' + extension);
    }
})

const uploads = multer ({storage : storage})

export default uploads