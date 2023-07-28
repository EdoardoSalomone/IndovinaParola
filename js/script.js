/*class parola{
    constructor(id,word) {
        this.id=id;
        this.word=word;
    }
}*/
class Gioco{
    constructor() {
        this.tentativi=5;
        this.parolaGenerata='';
        this.parolaPronta='';
    }
    rigeneraParola(){
        $.ajax('https://random-word-api.herokuapp.com/word?lang=it',{
            dataType:'json',
            type:'get'
        })
            .done(data=>{
                console.log('sei entrato nel done')
                let parolaGrezza=JSON.stringify(data);
                console.log(parolaGrezza);
                this.parolaPronta=rimuoviVirgoletteEParentesiQuadre(parolaGrezza);
                console.log(this.parolaPronta);
                //let parolaGenerataJson=JSON.stringify(data);
                //console.log(parolaGenerataJson);
                //let oggettoParola=JSON.parse(parolaGenerataJson);
                //da mettere dentro randomizza parola se quest'altra cosa non dovesse funzionare oggettoParola.word
                this.parolaGenerata= randomizzaParola(this.parolaPronta);
                console.log(this.parolaGenerata);
                let paragrafoParolaMescolata=$('#spazio-parola-mescolata');
                let paragrafoTentativi=$('#numero-tentativi');
                paragrafoParolaMescolata.html(this.parolaGenerata);
                paragrafoTentativi.html(this.tentativi);
                let parolaInserita=$('#parola-input');
                let parolaInseritaUtente=parolaInserita.text();
            })
            .fail(error=> console.error('errore sconosciuto'))
    }

    confrontaParola(parolaInserita) {
        if (this.tentativi > 0) {
            console.log(this.parolaGenerata.toLowerCase())
            console.log(parolaInserita.toLowerCase())
            if (this.parolaPronta.toLowerCase() === parolaInserita.toLowerCase()) {
                alert('Congratulazioni, hai indovinato');
                this.rigeneraParola();
            } else {
                let paragrafoTentativi=$('#numero-tentativi')
                alert('Peccato, non hai indovinato!');
                this.tentativi--;
                paragrafoTentativi.html(this.tentativi);
            }
        } else {
            this.tentativi = 5;
            this.rigeneraParola();
            let paragrafoTentativi = $('#numero-tentativi');
            paragrafoTentativi.html(this.tentativi);
            }
        }
}

function randomizzaArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
 function randomizzaParola(word){
    const arrayCaratteri= word.split('');
    const arrayMescolato= randomizzaArray(arrayCaratteri);
     return arrayMescolato.join('');
}
function rimuoviVirgoletteEParentesiQuadre(stringa) {
    // Rimuovi le virgolette e le parentesi quadre usando il metodo replace con espressioni regolari
    return stringa.replace(/["'\[\]]/g, '');
}
$(document).ready(function (){
    const gioco=new Gioco();
    let form=$('#form-inserimento-parola');
    let parolaInserita=$('#parola-input');
    let bottoneAvvia=$('#avvia-gioco');
    let paragrafoParolaMescolata=$('#spazio-parola-mescolata');
    let paragrafoTentativi=$('#numero-tentativi');
    let parolaGenerata='';
    gioco.rigeneraParola();
    $(document).on('submit',form,function (event){
       event.preventDefault();
       console.log(parolaInserita.val().trim());
       gioco.confrontaParola(parolaInserita.val().trim());
       parolaInserita.val('');//resetta input utente dopo ogni tentativo
    })

})