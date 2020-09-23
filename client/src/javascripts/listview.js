class ListView {
    getList() {
        fetch('http://localhost:3000/card', {
            method: 'GET'
        })
    }
}