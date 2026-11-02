const gastos = [
    {
        descripcion: "Compra de supermercado",
        monto: 125,
        categoria: "alimentacion"
    },
    {
        descripcion: "Mensualidad del gimnasio",
        monto: 30,
        categoria: "gym"
    },
    {
        descripcion: "Pago de internet",
        monto: 35,
        categoria: "servicios"
    },
    {
        descripcion: "Compra de gasolina",
        monto: 60,
        categoria: "transporte"
    },
    {
        descripcion: "Compra de almuerzo",
        monto: 8,
        categoria: "alimentacion"
    },
    {
        descripcion: "Compra de combustible adicional",
        monto: 45,
        categoria: "transporte"
    }
];

function calcularTotal(gastos) {
    let total = 0;

    for (let i = 0; i < gastos.length; i++) {

        if (typeof gastos[i].monto !== "number") {
            throw new Error("El monto del gasto " + gastos[i].descripcion + " no es un número.");
        }

        total = total + gastos[i].monto;
    }

    return total;
}

function calcularPromedio(gastos) {
    if (gastos.length === 0) {
        throw new Error("No se puede calcular el promedio de un array vacío.");
    }

    let total = calcularTotal(gastos);

    return total / gastos.length;
}


function filtrarPorCategoria(gastos, categoria) {
    const gastosFiltrados = [];

    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].categoria === categoria) {
            gastosFiltrados[gastosFiltrados.length] = gastos[i];
        }
    }

    return gastosFiltrados;
}



function obtenerMayorGasto(gastos) {
    if (gastos.length === 0) {
        return null;
    }

    let mayorGasto = gastos[0];

    for (let i = 1; i < gastos.length; i++) {
        if (gastos[i].monto > mayorGasto.monto) {
            mayorGasto = gastos[i];
        }
    }

    return mayorGasto;
}




function clasificarGasto(monto) {
    if (monto >= 100) {
        return "Alto";
    } else if (monto >= 50) {
        return "Medio";
    } else {
        return "Bajo";
    }
}




function describirCategoria(categoria) {
    switch (categoria) {
        case "alimentacion":
            return "Gastos de comida y supermercado";

        case "gym":
            return "Gastos de gimnasio";

        case "servicios":
            return "Gastos de servicios básicos";

        case "transporte":
            return "Gastos de transporte y combustible";

        default:
            return "Categoría no identificada";
    }
}


const obtenerNombreCategoria = (categoria) => categoria;
console.log("Categoría seleccionada:", obtenerNombreCategoria("alimentacion"));


function crearContadorDeAltos() {
    let contador = 0;

    return function () {
        contador++;
        return contador;
    };
}



try {

    const gastosClasificados = [];

    const contadorAltos = crearContadorDeAltos();
    let cantidadAltos = 0;

    for (let i = 0; i < gastos.length; i++) {
        const gasto = gastos[i];

        gastosClasificados[gastosClasificados.length] = {
            descripcion: gasto.descripcion,
            monto: gasto.monto,
            categoria: gasto.categoria,
            nivel: clasificarGasto(gasto.monto),
            descripcionCategoria: describirCategoria(gasto.categoria)
        };

        if (clasificarGasto(gasto.monto) === "Alto") {
            cantidadAltos = contadorAltos();
        }
    }

    console.table(gastosClasificados);

    console.log("Total gastado:", calcularTotal(gastos));
    console.log("Promedio de gastos:", calcularPromedio(gastos));
    const mayorGasto = obtenerMayorGasto(gastos);

    console.log("Gasto más alto:");
    console.log("Descripción:", mayorGasto.descripcion);
    console.log("Monto:", mayorGasto.monto);
    console.log("Categoría:", mayorGasto.categoria);

    console.log("Gastos de la categoría alimentación:");
    console.table(filtrarPorCategoria(gastos, "alimentacion"));

    console.log("Cantidad de gastos altos:", cantidadAltos);

    const resumenPorCategoria = {};

    for (let i = 0; i < gastos.length; i++) {
        const gasto = gastos[i];

        if (resumenPorCategoria[gasto.categoria] === undefined) {
            resumenPorCategoria[gasto.categoria] = 0;
        }

        resumenPorCategoria[gasto.categoria] =
            resumenPorCategoria[gasto.categoria] + gasto.monto;
    }

    console.log("Resumen por categoría:", resumenPorCategoria);

    const informe = {
        total: calcularTotal(gastos),
        promedio: calcularPromedio(gastos),
        cantidadAltos: cantidadAltos,
        mayorGasto: obtenerMayorGasto(gastos),
        resumenPorCategoria: resumenPorCategoria
    };

    console.log(JSON.stringify(informe, null, 2));

} catch (error) {
    console.error("Error al procesar los gastos:", error.message);
}


try {
    calcularPromedio([]);
} catch (error) {
    console.error("Error controlado:", error.message);
}