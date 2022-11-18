import axios from "axios";
import { useEffect, useState } from "react";

export default function ForumPage() {
    const [discussion, setDiscussion] = useState({
        'topic': '',
        'description': '',
        'likes': 0,
        'link': '',
        'date_created': '',
        'author': {
            'id': 0,
            'name': '',
            'avatar': ''
        }
    });  // add num of comments

    let fetchData = () => {
        axios.get(`http://localhost:8000/forum_details/discussions/`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).access}`
            }
        })
        .then(res => {
            (res.data).forEach(v => {
                console.log(v);
            });
            // console.log(res.data);
        })
        .catch(err => console.log(err))
    };

    useEffect(() => {
        console.log("wanna fetch data once");
        fetchData();
    }, []);

    return (
        <h1>Forum here</h1>
    )
}