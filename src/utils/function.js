export const utils = {
    generateName: (count) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let text = '';
        for (let i = 0; i < count; i++) {
            text += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return text;
    },

    generateLayout: (elements) => {
        return elements.map((item, i) => {
            console.log(item.i.toString())
            const y = Math.ceil(Math.random() * 4) + 1;
            return {
                x: Math.round(Math.random() * 5) * 2,
                y: Math.floor(i / 6) * y,
                w: 2,
                h: y,
                i: item.i.toString(),
            };
        });
    },

    formatDate: (stringDate) => {
        const date = new Date(stringDate)
        if (!isNaN(date.getTime())) {
            const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
            const month = monthNames[date.getMonth()]
            const day = date.getDate()
            return `${day} ${month} ${date.getFullYear()}`
        }
        return stringDate
    },

    keyHandlerCtrl: (key, event, callback) => {
        if (event.key === key && (event.metaKey || event.ctrlKey)) {
            event.preventDefault()
            callback(true)
        }
    },

    base64ToText: (data) => {
        const decode = data?.replace('data:application/json;base64,', '');
        return JSON.parse(atob(decode));
    }
}