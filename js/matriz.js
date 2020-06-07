var contentTable = document.getElementById('table')
var aleatorio = document.getElementById('random')
var columnas = 5
var filas = 5


var elementos = document.getElementsByClassName('matriz-item')


var estructura = tabla(contentTable, columnas, filas)	



/*----------  eventos  ----------*/

aleatorio.addEventListener('click', (e) => {
	random(e.target,contentTable, columnas, filas)

})


for(i = 0; i < elementos.length; i++){
	elementos[i].addEventListener('click', e => {matriz(e.target, columnas, filas) })

}


/**
 *
 * funciones
 *
 */

function random(e, table, column, row){
	var elementos = []
	var tds = table.childNodes
	// guardamos en el array elementos, todos las celdas que no estan seleccionadas
	for(i = 0; i < tds.length; i++){
		var trs = []
		if(tds[i].dataset.select =='false'){
			for(x = 0; x < tds[i].childNodes.length; x++){
				let aux = tds[i].childNodes[x]
				if(aux.dataset.select == 'false'){
					trs.push(aux)
				}
			}
			elementos.push(trs)
		}
	}
	
	// creamos el el rango de valores de acuerdo a los que aun no estan seleccionados
	var nRow = 0
	var nColumn = 0
	while (nRow < elementos.length){
		let aux = elementos[nRow]
		nRow++
		while (nColumn < aux.length){
			nColumn++
		}
	}
	var y = parseInt(Math.random() * nRow)
	var x = parseInt(Math.random() * nColumn)

	if(elementos.length != 0){
		matriz(elementos[y][x], column, row)
	}else{
		e.setAttribute('disabled', '')
	}
}

function matriz(e, column, row){
	var limite = column * row



	var tr = e.parentNode
	var td = e

	/*----------  instanciamos las columnas  ----------*/

	listado = []
	nTd = td.dataset.z

	while ( nTd >= 0){ 
		listado.push(nTd)
		nTd -= column 
	}

	while (nTd <= limite){
		listado.push(nTd)
		nTd += column
	}

	// si la columna no se encuentra seleccionada
	var trs = e.parentNode.parentNode.childNodes
	if(tr.dataset.select == "false" && td.dataset.select == 'false'){
		tr.dataset.select = "true"
		tr.classList.add('table-info')


		td.dataset.select = 'true'
		td.innerHTML = '-'

		// accedemos a todos los tr de la tabla
		for(x = 0; x < trs.length; x ++){

			//accedemos a todos los td dentro del tr de la tabla
			for (y = 0; y < trs[x].childNodes.length; y++){
				tds = trs[x].childNodes[y]


				//comparamos el dataset.z de cada celda con la lista de columas

				for(aux = 0; aux < listado.length; aux ++){

					if(tds.dataset.z == listado[aux]){
						tds.dataset.select = 'true'
						tds.classList.add('table-info')
					}
				}
			}
		}
		return true
	}
	return false
}



function tabla(items, column, row){
	var conteo = 0
	var estructura = ``
	var matriz = []
	for(i = 0; i < row; i++){
		estructura += `<tr data-select="false">`
		var item = []
		for(x = 0; x < column; x++){
			conteo+= 1
			item.push(conteo)
			estructura += `<td class="text-center matriz-item" data-z="`+ conteo + `" data-select="false">+</td>`
		}
		estructura += `</tr>`
		matriz.push(item)
	}

	items.innerHTML = estructura

	return 	matriz

}


