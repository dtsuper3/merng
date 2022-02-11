import { useState } from "react";

export function useForm(callback, initialState = {}) {
    const [values, setValues] = useState(initialState);

    function onChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    const onSubmit = event => {
        event.preventDefault();
        callback();
    }
    return {
        values,
        onChange,
        onSubmit
    }
}