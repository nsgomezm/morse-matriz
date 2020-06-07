/**
 *
 * creación de las variables
 *
 */



var campo = document.getElementById('campo')
var convertir = document.getElementById('convertir')
var textoConversion = document.getElementById('validationTextarea')
var selectConversion = document.getElementsByClassName('tipoConversion')
var invalid = document.getElementById('invalid')

/**
 *
 * creación de los eventos
 *
 */

convertir.addEventListener('click', () => {
	if(validar(campo)){
		textoConversion.innerHTML =  conversion(campo).toString().replace(/,/g, '')
	}
})



campo.addEventListener('keyup', e => {validar(campo) })


for (i = 0; i < selectConversion.length; i++){
	selectConversion[i].addEventListener('click', e => {
		if(e.target.dataset.conversion == 'texto'){
			validTexto(campo)
		}else{
			validMorse(campo)
		}
	})
}





/**
 *
 * creación de las funciones
 *
 */

function conversion(data){
	if(data.dataset.convertir == 'texto'){
		/*----------  dividimos las letras y palabras  ----------*/
		var morse = ""
		var palabras = data.value.split(" ");

		for (i = 0; i < palabras.length; i++){
			var row = []
			var letras = palabras[i].split("")

			for (x = 0; x < letras.length; x++){
				var letra = getLetra(letras[x])
				morse += ' ' + letra + ' '
			}
			morse += '/'
		}
		return morse

	}else if (data.dataset.convertir == 'morse'){
		var texto = ""
		var codigo = data.value.split(" ");

		for (i = 0; i < codigo.length; i++){
			if(!codigo[i] == ""){
				if(codigo[i] == '/'){
					texto += " "
				}else{
					texto += getMorse(codigo[i])
				}
			}
		}
		return texto.toLowerCase()
	}
	return false
}



function validar(data){
	var valid = data.dataset.convertir
	var value = data.value

	if(!data.value ==""){
		if(valid == 'texto'){
			var condicion = /(\s)?\w+/i
			if (condicion.test(value)){
				data.classList.remove('is-invalid')
			}else{
				data.classList.add('is-invalid')
				invalid.innerHTML = "Ingresar una cadena de texto"
				return false
			}

		}else if(valid == 'morse'){
			var condicion = /^\W+$/

			if (condicion.test(value)){
				data.classList.remove('is-invalid')
			}else{
				data.classList.add('is-invalid')
				invalid.innerHTML = "Ingresar un codigo morse"
				return false

			}
		}
	}

	return true
	
}


function validTexto(data){
	data.dataset.convertir = "texto"
	data.placeholder = "Ingresar cadena de texto"

	document.getElementById('textoMorse').classList.add('active')
	document.getElementById('morseTexto').classList.remove('active')
	validar(data)
}

function validMorse(data){
	data.dataset.convertir = "morse"
	data.placeholder = "Ingresar codigo morse"

	document.getElementById('morseTexto').classList.add('active')
	document.getElementById('textoMorse').classList.remove('active')
	validar(data)
}

function getLetra(letra){
	var letras = {
		'A':'.-',
		'H':'....',
		'O':'---',
		'V':'...-',
		'B':'-...',
		'I':'..',
		'P':'.--.',
		'W':'.--',
		'C':'-.-.',
		'J':'.---',
		'Q':'--.-',
		'X':'-..-',
		'D':'-..',
		'K':'-.-',
		'R':'.-.',
		'Y':'-.--',
		'E':'.',
		'L':'.-..',
		'S':'...',
		'Z':'--..',
		'F':'..-.',
		'M':'--',
		'T':'-',
		'G':'--.',
		'N':'-.',
		'U':'..-',
		'Ñ':'.-.-.',

	}
	return letras[letra.toUpperCase()]
}


function getMorse(letra){
	var morse = {
		'.-':'A',
		'....':'H',
		'---':'O',
		'...-':'V',
		'-...':'B',
		'..':'I',
		'.--.':'P',
		'.--':'W',
		'-.-.':'C',
		'.---':'J',
		'--.-':'Q',
		'-..-':'X',
		'-..':'D',
		'-.-':'K',
		'.-.':'R',
		'-.--':'Y',
		'.':'E',
		'.-..':'L',
		'...':'S',
		'--..':'Z',
		'..-.':'F',
		'--':'M',
		'-':'T',
		'--.':'G',
		'-.':'N',
		'..-':'U',
		'.-.-.':'Ñ'

	}
	return morse[letra]
}

