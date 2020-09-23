class ListView {
    getList(userId) {
        fetch(`http://localhost:3000/list`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(res => console.log(res));
    }
}

export default ListView;
