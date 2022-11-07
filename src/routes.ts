import { Express, Request, Response } from "express"

const routes = (app:Express) => {
    app.get("/", (req: Request, res: Response)=>{
        res.send(`<h1>IT IS WORKING</h1>`)
    })
}

export default routes