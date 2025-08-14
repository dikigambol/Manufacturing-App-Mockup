import { LayoutContext } from "@/contexts/interact"
import { Container } from "@/layouts/container"
// import { chartData } from "@/requests/data"
import { local } from "@/utils/access"
import { utils } from "@/utils/function"
import { useContext, useEffect, useState } from "react"

// const pages = () => {
    // const [data, setData] = useState([])
    // const [active, setActive] = useState('dataname') // ini bisa di ubah sesuai dengan data yang ingin ditampilkan

    // const getData = () => {
    //     const result = chartData
    //     result.map((item) => {
    //         item.date = utils.formatDate(item.date)
    //     })
    //     setData(result)
    // }

    // const chartConfig = {
    //     views: {
    //         label: 'Demo Chart',
    //     },
    //     dataname: {
    //         label: "count",
    //         color: "var(--chart-2)",
    //     },
    // }

    // const callback = [
    //     {
    //         label: 'Settings',
    //         event: (id) => {
    //             console.log(`Settings clicked. ${id}`)
    //         }
    //     },
    //     {
    //         label: 'Other Action',
    //         event: (id) => {
    //             console.log(`Action clicked. ${id}`)
    //         }
    //     }
    // ]

    // useEffect(() => {
    //     getData()
    // }, [])

    // const elements = [
    //     { i: 0, component: <AppCard title={'Card 12'} callback={callback} target={0}>Test Card</AppCard> },
    //     { i: 1, component: <AppCard title={'Card 1'} callback={callback} target={1}>Test Card</AppCard> },
    //     {
    //         i: 2, component: <AppCard title={'Demo Grafik'} callback={callback} target={2}>
    //             <AppChartBar datas={data} config={chartConfig} active={active} />
    //         </AppCard>
    //     },
    //     { i: 3, component: <AppCard title={'Card 3'} callback={callback} target={3}>Test Card</AppCard> },
    //     { i: 4, component: <AppCard title={'Card 4'} callback={callback} target={4}>Test Card</AppCard> },
        // { i: 5, component: <AppCard title={'Card 5'} callback={callback} target={5}>Test Card</AppCard> },
        // { i: 6, component: <AppCard title={'Card 6'} callback={callback} target={6}>Test Card</AppCard> },
        // { i: 7, component: <AppCard title={'Card 7'} callback={callback} target={7}>Test Card</AppCard> },
        // { i: 8, component: <AppCard title={'Card 8'} callback={callback} target={8}>Test Card</AppCard> },
        // { i: 9, component: <AppCard title={'Card 9'} callback={callback} target={9}>Test Card</AppCard> },
        // { i: 10, component: <AppCard title={'Card 10'} callback={callback} target={10}>Test Card</AppCard> }
    // ]

    // return elements
// }

const Home = () => {
    const { components} = useContext(LayoutContext)
    // const [layout, setLayout] = useState(local.get('container'));
    // const elements = pages()
    
    // const configuration = (config) => {
    //     updateLayout(config)
    // }

    return (
        components.length > 0 ? <Container /> : ''
    )
}


export default Home