import { employee } from "@/requests/data";

// data yang bisa menggunakan chartbar hanya type integer salah satunya working dan age
export const chartBar = {
    i: 'bar', // bersifat unix
    defaultActive: 'working', // default data yang di tampilkan
    // config: {
    //     working: {
    //         label: 'Jam Kerja',
    //         color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // warna pakek hex
    //     },
    //     age: {
    //         label: 'Usia Karyawan',
    //         color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    //     }
    // }
}

// export const