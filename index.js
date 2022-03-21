import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

/* CHART */
app.get("/", async (request, response)=>{

    try{

         const {data} = await axios('http://api.deezer.com/chart')

         return response.json(data.tracks.data)

    }catch(err){
        return err
    }


})

/* SEARCH */
app.post("/search", async(request, response)=>{

    const { search } = request.body
    search.replace(" ", "%20")
    try {

        const newSearch =  await axios.get(`https://api.deezer.com/search?q=${search}`);
        //console.log('res', newSearch.data)
        response.json(newSearch.data)

    }catch(err){
        return err
    }
});

/* PAGE */
app.post("/page", async(request, response)=>{

    const { search, page } = request.body
    search.replace(" ", "%20")
    try {

        const newSearch =  await axios.get(`https://api.deezer.com/search?q=${search}&index=${page}`);
        response.json(newSearch.data)

    }catch(err){
        return err
    }
});




app.listen(9999, ()=>{
    console.log("server is running on port:9999");
})