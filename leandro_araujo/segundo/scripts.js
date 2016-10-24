
var inputNome = document.querySelector('#inputNome');
var inputTelefone = document.querySelector('#inputTelefone');
var inputEmail = document.querySelector('#inputEmail');
var reset = document.querySelector('#reset');

inputNome.addEventListener('blur', function(event) {
  validaNome(form.nome);
})

inputTelefone.addEventListener('blur', function(event) {
  validaTelefone(form.telefone);
})

inputEmail.addEventListener('blur', function(event) {
  validaEmail(form.email);
})

reset.addEventListener('click', function(event) {
  form.nome.parentElement.classList.remove('has-success');
  form.telefone.parentElement.classList.remove('has-success');
  form.email.parentElement.classList.remove('has-success');
  form.nome.parentElement.classList.remove('has-error');
  form.telefone.parentElement.classList.remove('has-error');
  form.email.parentElement.classList.remove('has-error');
})

form.addEventListener('submit', function(event) {
  event.preventDefault();

  validaNome(form.nome);
  validaTelefone(form.telefone);
  validaEmail(form.email);

  if(validaNome(form.nome) && validaTelefone(form.telefone) && validaEmail(form.email)) {
    criaAgenda(form);
  }
})

function validaNome(el) {
  /*
   * - Deve aceitar somente letras.
   * - Não pode aceitar números ou caracteres especiais
   */

  var validador = /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ\s]+$/;

  return validaInput(el, validador);
}

function validaTelefone(el) {
  /*
   * - Deve aceitar somente números e os caracteres `()` e `-`.
   * - Não pode aceitar letras ou caracteres especiais.
   * - Se possível crie uma máscara para separar o DDD do número de telefone seguindo o  formato: `(xx)` xxxx-xxxx`.
   */

  var validador = /^\([1-9]{2}\) [2-9][0-9]{2,5}\-[0-9]{4}$/;

  return validaInput(el, validador);
}

function validaEmail (el) {
  /*
   * - Deve seguir o formato padrão de email `xxx@xx.xx`
   * - Deve aceitar letras, números e os caracteres `@`, `.`, `-` e `_`
   * - Não pode aceitar o restante dos caracteres especiais.
   */

  var validador = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

  return validaInput(el, validador);
}

function validaInput(el, validador) {
  el.parentElement.classList.remove('has-success');
  el.parentElement.classList.remove('has-error');

  if(el.value.match(validador)) {
    console.log(true);
    el.parentElement.classList.add('has-success');
    return true;
  } else {
    console.log(false);
    if(el.value.length > 0) {
      el.parentElement.classList.add('has-error');
    }
    return false;
  }
}

function criaAgenda(form) {
  var elAgenda = document.querySelector('#agenda');
  var lista    = elAgenda.querySelector('ul');
  var el = document.createElement('li');

  elAgenda.classList.remove('hide');

  el.innerHTML = form.nome.value + '<div>' + form.telefone.value + ' - ' + form.email.value + '</div>';

  lista.appendChild(el);
}