<!-- PROJECT LOGO -->
<br />

<h3 align="center">Donaciones-Stellar</h3>

  <p align="center">
    Donaciones transparentes en stellar
    <br />
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## Sobre el proyecto

¿Cómo funciona la app?

Cuando el usuario se registra en nuestra app, nosotros le creamos una billetera y le manejamos la billetera sin que se cuenta.
Un usuario puede donar a un proyecto de una organización, y el dinero que donó se va a una cuenta intermediaria (nuestra) que retiene el dinero hasta que se cumple la meta del proyecto. Después de que se cumpla la meta se libera el dinero y se va a la organización. En caso contrario el dinero vuelve al usuario.
A la organización se le da 15 días para comprobar que cumplió con el proyecto (comprobantes de pago, fotos, etc.). Después de estos 15 días el usuario puede votar si le gusto o no lo que se hizo con el dinero que donó.
.
¿Cómo se manejan los votos?

Al donar a un proyecto, el usuario recibe 2 assets (un voto positivo y un voto negativo). Luego, cuando el usuario vota, el asset es enviado a la wallet de la organización y el voto no usado es descartado. Para verificar la reputación de una organización se mira su wallet y se cuenta los assets positivos y negativos que tiene.
La cuenta de la organización solo puede recibir dinero de la cuenta principal de la app y no tiene el poder de mover los assets que sirven de votos

<p align="right">(<a href="#top">back to top</a>)</p>



### Hecho con
Front:
* React
* React-Query
* Material-ui
* Formik

Back:
* Typescript
* NodeJs
* Inversify
* Sequelize
* Stellar-sdk

<p align="right">(<a href="#top">back to top</a>)</p>
