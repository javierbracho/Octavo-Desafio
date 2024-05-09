const loggertestController = (req, res) => {
    try {
        req.logger.debug("Hola soy nivel debug");
        req.logger.http("Hola soy nivel http");
        req.logger.info("Hola soy nivel info");
        req.logger.warning("Hola soy nivel warning");
        req.logger.error("Hola soy nivel error");
        req.logger.fatal("Hola soy nivel fatal");
    
        res.send("Logs generados");
    } catch (error) {
        console.error("Error en el controlador loggertest:", error);
        res.status(500).send("Error en el servidor");
    }
};

export default loggertestController