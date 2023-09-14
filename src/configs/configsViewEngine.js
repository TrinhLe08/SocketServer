
import express from "express";

const configViewEngine = (app) => {

    app.set("views", "./src/views")
}
export default configViewEngine