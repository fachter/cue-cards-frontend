import React from 'react'


const folderarray = [{
    ID: '1',
    name: "Wirtschaftsinformatik",
    isFolder: true,
    cards: [],
    subFolder: [
        {
            ID: '1',
            name: "Definitionen",
            isFolder: false,
            cards: [],
            subFolder: []

        },
        {
            ID: '2',
            name: "Grundlagen",
            isFolder: false,
            cards: [],
            subFolder: []
        },
        {
            ID: '3',
            name: "Datenbanken",
            isFolder: false,
            cards: [],
            subFolder: []
        },
        {
            ID: '4',
            name: "SQL",
            isFolder: false,
            cards: [],
            subFolder: []
        },

    ]


},]

// {
//     ID: '2',
//     name: "Englisch",
//     isFolder: false,
//     subStructure: [
//         {
//             cardID: '1',
//             cardType: 'MC',
//             questionText: 'ich bin eine Frage',
//             cardLevel: 2,            // Stufe im Karteikasten
//             cardTopic: 'Topic',
//             numberOfRightTurns: null,  // wie oft wurde die Karte bereits richtig beantwortet (bsp. ab 3 level up)
//             numberOfRightAnswers: 2,
//             answers: [
//                 {
//                     answerID: '1',
//                     answerText: 'A',
//                     checkID: '1'   //Stimmt die CheckID mit der CardID über ein so ist dies eine der richtigen Antworten
//                 },
//                 {
//                     answerID: '3',
//                     answerText: 'C',
//                     checkID: '1'
//                 },



//             ]
//         },
//         {
//             cardID: '2',
//             cardType: 'Voc',
//             questionText: 'Auto',
//             cardLevel: 3,            // Stufe im Karteikasten
//             numberOfRightTurns: null,  // wie oft wurde die Karte bereits richtig beantwortet (bsp. ab 3 level up)
//             solution: 'Car'
//         },
//         {
//             cardID: '4',
//             cardType: 'MC',
//             questionText: 'ich bin eine Frage',
//             cardLevel: 2,            // Stufe im Karteikasten
//             cardTopic: 'Topic',
//             numberOfRightTurns: null,  // wie oft wurde die Karte bereits richtig beantwortet (bsp. ab 3 level up)
//             numberOfRightAnswers: 2,
//             answers: [
//                 {
//                     answerID: '1',
//                     answerText: 'MAUS',
//                     checkID: '1'   //Stimmt die CheckID mit der CardID über ein so ist dies eine der richtigen Antworten
//                 },
//                 {
//                     answerID: '2',
//                     answerText: 'HUND',
//                     checkID: '3'
//                 },




//             ]
//         },

//     ]

// },
// {

//     ID: '3',
//     name: "Logistik",
//     isFolder: true,
//     subStructure: [
//         {
//             ID: '1',
//             name: "Distributionslogistik"
//         },
//         {
//             ID: '2',
//             name: "Lagerlogistik"
//         },
//         {
//             ID: '3',
//             name: "Produktionslogistik"
//         },
//         {
//             ID: '4',
//             name: "Beschaffungslogistik"
//         },
//     ]

// },
// {
//     ID: '4',
//     name: "Biologie",
//     isFolder: true,
//     subStructure: [
//         {
//             ID: '1',
//             name: "Sexualkunde"

//         },
//         {
//             ID: '2',
//             name: "Tierkunde"
//         },
//         {
//             ID: '3',
//             name: "Pflanzenkunde"
//         },
//         {
//             ID: '4',
//             name: "Anatomie"
//         },

//     ]
// }];


const ListStructureContext = React.createContext()


class ListStructureProvider extends React.Component {

    state = {
        mainlistStructure: folderarray,
        listHistoryArray: [],
        currentListStructure: folderarray,
        isFolder: true,
        CreateFileWindowVisible: false,  //PopupFenster um neue Datei anzuulegen
        query: "",
        fullData: []
    }

    setMainListStructure = (mainlistStructure) => {
        this.setState({ mainlistStructure })
    }
    setCurrentListStructure = (newListStructure) => {
        this.setState({ currentListStructure: newListStructure })
    }

    updateFolderHistory = () => {
        this.state.listHistoryArray.push(this.state.currentListStructure)
    }

    _getLastFolderStructure = () => {
        return this.state.listHistoryArray.pop()
    }

    setIsFolder = (isFolder) => {
        this.setState({ isFolder })
    }

    setCreateFileWindowVisible = (CreateFileWindowVisible) => {
        this.setState({ CreateFileWindowVisible })
    }

    setQuery = (query) => {
        this.setState({query})
    }

    setFullDat = (fullData) => {
        this.setState({fullData})
    }

    getQuery = (query) => {
        return this.state.query
    }


    render() {
        return (
            
            <ListStructureContext.Provider value={{
                mainlistStructure: this.state.mainlistStructure,
                setMainListStructure: this.setMainListStructure,
                listHistoryArray: this.state.listHistoryArray,
                updateFolderHistory: this.updateFolderHistory,
                _getLastFolderStructure: this._getLastFolderStructure,
                currentListStructure: this.state.currentListStructure,
                setCurrentListStructure: this.setCurrentListStructure,
                isFolder: this.state.isFolder,
                setIsFolder: this.setIsFolder,
                CreateFileWindowVisible: this.state.CreateFileWindowVisible,
                setCreateFileWindowVisible: this.setCreateFileWindowVisible,
                query: this.state.query,
                setQuery: this.setQuery,
                fullData: this.state.fullData,
                setFullData: this.setFullData,
                getQuery: this.getQuery
            }}>
                {this.props.children}
            </ListStructureContext.Provider>
            
        )
    }
}

export { ListStructureProvider, ListStructureContext }