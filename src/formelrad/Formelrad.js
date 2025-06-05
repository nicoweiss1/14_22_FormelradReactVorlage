import { useState } from "react";
import '../css/mvp.css';
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";

export default function Formelrad() {
    const [values, setValues] = useState({
        u: 10,
        i: 2,
        r: "",
        p: "",
        message: ""
    });

    const [colors, setColors] = useState({
        u: "black",
        i: "black",
        r: "black",
        p: "black",
        message: "red"
    });

    const handleClear = (event) => {
        event.preventDefault();
        console.log("handleClear");

        setValues({
            u: "",
            i: "",
            r: "",
            p: "",
            message: ""
        });

        resetColors();
    };

    function resetColors() {
        setColors(colors => ({
            ...colors,
            u: "black",
            i: "black",
            r: "black",
            p: "black"
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSubmit");

        resetColors();

        const emptyFields = [values.u, values.i, values.r, values.p].filter(v => v === "").length;
        if (emptyFields !== 2) {
            setValues(values => ({ ...values, message: "Bitte genau zwei Felder leer lassen!" }));
            return;
        } else {
            setValues(values => ({ ...values, message: "" }));
        }

        if (values.i === "" && values.r === "") {
            setValues(values => {
                const i = values.p / values.u;
                const r = values.u * values.u / values.p;
                return { ...values, i, r };
            });
            setColors(colors => ({ ...colors, i: "red", r: "red" }));
        } else if (values.i === "" && values.p === "") {
            setValues(values => {
                const i = values.u / values.r;
                const p = values.u * values.u / values.r;
                return { ...values, i, p };
            });
            setColors(colors => ({ ...colors, i: "red", p: "red" }));
        } else if (values.u === "" && values.i === "") {
            setValues(values => {
                const u = Math.sqrt(values.p * values.r);
                const i = Math.sqrt(values.p / values.r);
                return { ...values, u, i };
            });
            setColors(colors => ({ ...colors, u: "red", i: "red" }));
        } else if (values.u === "" && values.r === "") {
            setValues(values => {
                const u = values.p / values.i;
                const r = values.p / values.i / values.i;
                return { ...values, u, r };
            });
            setColors(colors => ({ ...colors, u: "red", r: "red" }));
        } else if (values.u === "" && values.p === "") {
            setValues(values => {
                const u = values.i * values.r;
                const p = values.i * values.i * values.r;
                return { ...values, u, p };
            });
            setColors(colors => ({ ...colors, u: "red", p: "red" }));
        } else {
            setValues(values => {
                const r = values.u / values.i;
                const p = values.u * values.i;
                return { ...values, r, p };
            });
            setColors(colors => ({ ...colors, r: "red", p: "red" }));
        }
    };

    return (
        <>
            <section>
                <header>
                    <h2>Formelrad</h2>
                    <img src={formelrad} width="200" alt="Formelrad" />
                </header>
                <form onSubmit={handleSubmit}>
                    <InputField color={colors.u} value={values.u} label="Spannung" handleChange={e => { setValues(values => ({ ...values, u: e.target.value })) }} />
                    <InputField color={colors.i} value={values.i} label="Stromstärke" handleChange={e => { setValues(values => ({ ...values, i: e.target.value })) }} />
                    <InputField color={colors.r} value={values.r} label="Widerstand" handleChange={e => { setValues(values => ({ ...values, r: e.target.value })) }} />
                    <InputField color={colors.p} value={values.p} label="Leistung" handleChange={e => { setValues(values => ({ ...values, p: e.target.value })) }} />
                    <button type="submit">Calculate</button>
                    <button style={{ margin: 10 }} onClick={handleClear}>Clear</button>
                    <p style={{ color: colors.message }}>{values.message}</p>
                </form>
            </section>
        </>
    );
}
