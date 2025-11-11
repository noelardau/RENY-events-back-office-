

export interface evenement {
   evenement_id: string;
    titre: string;
    description: string;
    date_debut: string;
    date_fin: string;
    lieu: string;
    type_evenement: {
        type_evenement_id: string;
        type_evenement_nom: string;
    };
}