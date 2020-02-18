import React from 'react';
import { Slide } from 'react-slideshow-image';
import { Container} from 'react'
import a1 from '../Images/a1.jpg' ;
import a2 from '../Images/a2.jpg' ;
import a3 from '../Images/a3.jpg' ;
import a4 from '../Images/a4.jpg' ;


const slideImages = [

    'Images/a2.jpg',
    'Images/a3.jpg',
    'Images/e-sante.jpg'
] ;

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
      console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
  }


export default () => {
  return (
    <div className="slide-container" backgroundImage >
          <Slide {...properties}>
            <div className="each-slide">
              <div>
                  <img  min-width="100%" src={a1} alt = "a1" min-width="100%"/>
              </div>
            </div>
            <div className="each-slide">
              <div>
                  <img  min-width="100%" src={a2} alt = "a1" />
              </div>
            </div>
            <div className="each-slide">
              <div>
                  <img  min-width="100%" src={a3} alt = "a1" />
              </div>
            </div>
            <div className="each-slide">
              <div>
                  <img  min-width="100%" src={a4} alt = "a1" />
              </div>
            </div>

          </Slide>

      <section class="container-fluid about">
          <div className="container">
          <h1 id="about">Qui sommes nous</h1>
          <hr className="separator" />
    <div className="row">
        <hr className="separator" />
      <article className="col-md-4 col-lg-4 col-xs-12 col-sm-12">

        <h2> A propos de nous </h2>
        <p>
        L’offre de données Open Medic est constituée d’un ensemble de bases
        annuelles, portant sur l’usage du médicament, délivré en pharmacie de
        ville de 2014 à 2018. Elle fournit des informations complémentaires au
        fichier Medic’AM.
        Toutes les données sont extraites du Système National des Données de
         Santé (SNDS).
        </p>
        <p>
        Les données sur le médicament sont restituées au travers de la
        classification ATC. La classification ATC est utilisée pour classer
        les médicaments selon un principe hiérarchique. Les médicaments sont divisés
        en différents groupes selon l'organe ou le système sur lequel ils
        agissent et/ou leurs caractéristiques thérapeutiques et chimiques.
        </p>
      </article>
      <article className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
        <h2> A propos de nous </h2>
        <p>
        L’offre de données Open Medic est constituée d’un ensemble de bases
        annuelles, portant sur l’usage du médicament, délivré en pharmacie de
        ville de 2014 à 2018. Elle fournit des informations complémentaires au
        fichier Medic’AM.
        Toutes les données sont extraites du Système National des Données de
         Santé (SNDS).
        </p>
        <p>
        Les données sur le médicament sont restituées au travers de la
        classification ATC. La classification ATC est utilisée pour classer
        les médicaments selon un principe hiérarchique. Les médicaments sont divisés
        en différents groupes selon l'organe ou le système sur lequel ils
        agissent et/ou leurs caractéristiques thérapeutiques et chimiques.
        </p>

      </article>
      <article className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
        <h2> A propos de nous </h2>
        <p>
        L’offre de données Open Medic est constituée d’un ensemble de bases
        annuelles, portant sur l’usage du médicament, délivré en pharmacie de
        ville de 2014 à 2018. Elle fournit des informations complémentaires au
        fichier Medic’AM.
        Toutes les données sont extraites du Système National des Données de
         Santé (SNDS).
        </p>
        <p>
        Les données sur le médicament sont restituées au travers de la
        classification ATC. La classification ATC est utilisée pour classer
        les médicaments selon un principe hiérarchique. Les médicaments sont divisés
        en différents groupes selon l'organe ou le système sur lequel ils
        agissent et/ou leurs caractéristiques thérapeutiques et chimiques.
        </p>

      </article>
     </div>
     </div>
     </section>
     </div>
  );
};
