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
            case "identificacion":
            case "comprobante-de-domicilio":
            case "comprobante-de-estado-de-cuenta":
                destinationFolder = "./src/uploads/documents";
                break; 
        }
        cb(null, destinationFolder)
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.').pop(); // Extrae la extensión del archivo
        let newFilename;

        // Verificar el campo y asignar un contador para archivos
        if (file.fieldname === "profile" || file.fieldname === "products") {
            newFilename = `${file.fieldname}${Date.now()}.${extension}`; // Usar timestamp para crear nombre único
        } else {
            newFilename = `${file.fieldname}.${extension}`; // Usar nombre original para documentos
        }

        cb(null, newFilename);
    }
});

// Configuración de Multer
const uploads = multer({ storage: storage });

export default uploads;