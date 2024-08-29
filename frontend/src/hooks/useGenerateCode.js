import { useState, useEffect } from "react";

const useGenerateCode = () => {
    const [codigo, setCodigo] = useState('');

    useEffect(() => {
        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCodigo(generatedCode);
    }, []);

    return codigo;
};

export default useGenerateCode;
