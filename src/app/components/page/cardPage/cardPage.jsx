import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpServices from "../../../services/http.service";
import BlockImg from "./blockImg";
import BlockInfoProduct from "./blockInfoProduct";
import styles from "./card.module.css";

const CardPage = () => {
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await httpServices.get(`product/${id}/.json`);
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    // data === null ? <h1>Loading...</h1> :
    return (
        <div className={styles.flex}>
            <div className={styles.blockImg}>
                <BlockImg image={data !== null ? data.imgProduct : []} />
            </div>
            <div className={styles.blockInfo}>
                <BlockInfoProduct data={data !== null ? data : {}} />
            </div>
        </div>
    );
};

export default CardPage;
