import toast from "react-hot-toast"

export const handleCopy = (toCopy: string, format: boolean) => {
    if (toCopy) {
        if (format) {
            navigator.clipboard.writeText(JSON.stringify(JSON.parse(toCopy), undefined, 4)).then(() => {
                console.log("Copiado")
                toast.success('Copiado al portapapeles!');
            })
        } else {
            navigator.clipboard.writeText(toCopy).then(() => {
                console.log("Copiado")
                toast.success('Copiado al portapapeles!');
            })
        }
    } else {
        toast.error('No hay nada que copiar');
    }
}

export function eliminarCookies() {
    document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}
