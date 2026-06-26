var buttons = document.getElementsByClassName('product-button');
var selectedCount = 0;
for (var i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  if (button.classList.contains('active')) {
    selectedCount++;
  }
}
var submitButton = document.getElementById('submitButton');
var codeInvite = document.getElementById('codeInvite').getAttribute("value");

// Fonction pour mettre Ã  jour l'Ã©tat des boutons et des cases Ã  cocher
function updateSelection(button) {
  var product = button.getAttribute('data-product');

  // VÃ©rifier si le bouton est activÃ© ou dÃ©sactivÃ©
  if (button.classList.contains('active')) {
    button.classList.remove('active');
    selectedCount--;
  } else {
    // VÃ©rifier si le nombre maximum de sÃ©lections est atteint
    if (selectedCount >= 2) {
      return;
    }

    button.classList.add('active');
    selectedCount++;
  }

  // Afficher ou masquer le bouton "Soumettre" en fonction du nombre de sÃ©lections
  if (selectedCount >= 1) {
    submitButton.style.display = 'block';
  } else {
    submitButton.style.display = 'none';
  }
}

// Ajouter un Ã©couteur d'Ã©vÃ©nement Ã  chaque bouton
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    updateSelection(this);
  });
}

function annuler() {
  Swal.fire({
    title: 'Voulez-vous annuler votre invitation ?',
    text: "Une fois votre invitation annulÃ©e, vous ne serez plus considÃ©rÃ© comme invitÃ© ",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Non',
    confirmButtonText: 'Oui, annuler !'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: document.getElementById('url_annulation').getAttribute("value"),
        type: 'GET',
        async: false,
        success: function (data) {
          Swal.fire(
            'AnnulÃ©!',
            'Votre participation Ã  cette activitÃ© a Ã©tÃ© annulÃ©',
            'success'
          )
        },
        error: function (xhr, textStatus, errorThrown) {

        }
      })
    }
  })
}

function Soumettre() {
  let BoissonsCochees = [];
  for (var i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    if (button.classList.contains('active')) {
      BoissonsCochees.push(button.getAttribute("data-product"))
    }
  }
  let choixInvite = {
    codeInvite: codeInvite,
    boissons: JSON.stringify(BoissonsCochees)
  }

  $.ajax({
    url: document.getElementById('url').getAttribute("value"),
    type: 'POST',
    data: choixInvite,
    async: false,
    success: function (data) {
      // alert(data);
      // $("#modal-form-input-edit").html(data);
      // $("#modal-form-input-edit").modal('show');

      const notyf = new Notyf({
        position: {
          x: 'left',
          y: 'top',
        },
        types: [
          {
            type: 'info',
            background: '#0948B3',
            dismissible: false
          }
        ]
      });
      notyf.open({
        type: 'info',
        message: 'Votre choix de boissons a Ã©tÃ© pris en compte'
      });
    },
    error: function (xhr, textStatus, errorThrown) {
      const notyf = new Notyf({
        position: {
          x: 'left',
          y: 'top',
        },
        types: [
          {
            type: 'info',
            background: '#ffffff',
            icon: {
              className: 'fas fa-info-circle',
              tagName: 'span',
              color: '#fff'
            },
            dismissible: false
          }
        ]
      });
      notyf.open({
        type: 'error',
        message: 'Votre choix de boissons a Ã©tÃ© pris en compte'
      });
    }
  })

}