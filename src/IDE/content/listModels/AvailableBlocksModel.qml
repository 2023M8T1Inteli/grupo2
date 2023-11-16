import QtQuick 6.2

ListModel { 

    ListElement {
        name: "Interação"
        category: "Events"
        blocks: [
            ListElement {
                name: "Se quadrante 4 pressionado"
                portrait: "img/onPress.png"
                refCode: "botao_pressionado = ler_varios(4, 1, 0)\nse botao_pressionado entao\ninicio\n"
                category: "Events"
            },
            ListElement {
                name: "Se quadrante 1 pressionado"
                portrait: "img/onPress.png"
                refCode: "botao_pressionado = ler_varios(1, 1, 0)\nse botao_pressionado entao\ninicio\n"
                category: "Events"
            }

        ]
    }

    ListElement {
        name: "Ações / Exibição"
        category: "Actions"
        blocks: [
            ListElement {
                name: "Mostrar Imagem"
                portrait: "img/executeAction.png"
                refCode: "mostrar("
                category: "Actions"
            }
        ]
    }

    ListElement {
        name: "Suas Imagens"
        category: "Images"
        blocks: [
            ListElement {
                name: "Melão"
                portrait: "img/melao.png"
                refCode: "1)\nfim\n"
                category: "Images"
            },
            ListElement {
                name: "Maçã"
                portrait: "img/maca.png"
                refCode: "2)\nfim\n"
                category: "Images"
            },
            ListElement {
                name: "Banana"
                portrait: "img/banana.png"
                refCode: "3)\nfim\n"
                category: "Images"
            }
        ]
    }

}

