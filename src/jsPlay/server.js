import express from "express";
import axios from "axios"; // Import axios
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8000;

app.post('/api/v1/lali', async (req, res) => {
    try {
        const { user_input, user_id } = req.body;
        
        const sessionid = "7vw0rfe785iy0haybba7o4g69n2eh8kb";
        
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `sessionid=${sessionid}` // Set the sessionid in the headers
            }
        };

        const response = await axios.post("https://xn--11by0j.com/api/v1/lali/", {
            user_input: user_input,
            user_id: user_id
        }, options);

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(PORT, () => console.log("Your server is running on PORT", PORT));