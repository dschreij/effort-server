<template>
  <v-container
    grid-list-lg
  >
    <v-layout wrap>
      <v-flex
        xs12
        xl8
        offset-xl2
        text-center
      >
        <h1>Session {{ session && session._id }}</h1>
        <h1 class="font-weight-light pb-4">
          Selección de juguetes
        </h1>
        <p>
          Escoge los juguetes/juegos que prefieras <strong>teniendo en cuenta los puntos que has
            obtenido</strong> en la prueba que acabas de hacer en el ordenador. Recuerda que no
          puedes escoger más de un juguete del mismo tipo, y que en algunos casos tendrás que
          marcar qué modelo de juguete
          quieres.
        </p>
        <p>
          Por ejemplo, imagina que tienes 300 puntos. En ese caso podrías seleccionar, o bien
          una baraja de cartas (300 puntos), o bien la pelota + el spinner (100+200 puntos).
          Sin embargo, NO podrías escoger juguetes de más valor o tres spinners iguales.
        </p>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex
        xs12
        text-center
        py-5
      >
        <h3>RODEA LOS JUGUETES POR LOS QUE TE HAYAS DECIDIDO</h3>
      </v-flex>
      <v-flex xs12>
        <v-layout wrap>
          <v-flex
            xs12
            md9
          >
            <v-layout wrap>
              <v-flex
                v-for="toy in toys"
                :key="toy.name"
                xs12
                sm6
                lg4
                xl3
              >
                <toy-choice
                  :affordable="availablePoints >= toy.points"
                  :toy="toy"
                  :selected="isSelected(toy)"
                  @tapped="toggleSelection"
                />
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex
            xs12
            md3
          >
            <toy-selection
              :selected="selected"
              :points="points"
              @clicked-remove="toggleSelection"
              @clicked-proceed="processSelection"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialog.visible"
      persistent
      max-width="350"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="headline">
          {{ dialog.title }}
        </v-card-title>
        <v-card-text class="body-1">
          {{ dialog.contents }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="dialog.visible = false"
          >
            Non
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="proceed"
          >
            Sì
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { Mongo } from 'meteor/mongo';
import isObject from 'lodash/isObject';
import ToySelection from '../components/toySelection.vue';
import ToyChoice from '../components/toyChoice.vue';
import { Sessions } from '../../imports/collections/Sessions';


export default {
  components: { ToyChoice, ToySelection },
  data() {
    return {
      toys: [
        {
          name: 'Spinner',
          points: 100,
          img: 'img/1€ spinner.PNG',
        },
        {
          name: 'Pelota',
          points: 200,
          img: 'img/2€ pelota.PNG',
        },
        {
          name: 'Baraja de carts, los cartas increìbles',
          points: 300,
          img: 'img/cartas increibles.png',
        },
        {
          name: 'Juego de raquetas con pelota y volatìn',
          points: 400,
          img: 'img/4€ raquetas.PNG',
        },
        {
          name: 'Diverticiencia: experimentos variados',
          points: 500,
          img: 'img/5€ diverticiencia.PNG',
        },
        {
          name: 'Slime shaker',
          points: 600,
          img: 'img/6€ slime.PNG',
        },
        {
          name: 'Trucos de magia: Luces o cartas',
          points: 700,
          img: 'img/7€ magia1.PNG',
          note: 'Elige solamente un tipo',
        },
        {
          name: 'Cuál es cuál: juego de mesa',
          points: 800,
          img: 'img/8€ cual es cual.PNG',
        },
        {
          name: 'Cartas: "Uno: Get wild" o "dos"',
          points: 900,
          img: 'img/9€ cartas uno.jpg',
          img2: 'img/9€ cartas dos.jpg',
          imgRatio: 0.9,
          note: 'Elige solamente un tipo',
        },
        {
          name: 'Juego de lego: modelo aleatorio',
          points: 1000,
          img: 'img/10€ lego grande.PNG',
        },
      ],
      selected: [],
      dialog: {
        visible: false,
        title: '',
        contents: '',
      },
      sessionId: this.$route.query.sessionId,
    };
  },
  computed: {
    spendingPoints() {
      if (!isObject(this.session)) return 0;
      return Object.values(this.session.points).reduce((total, pts) => total + pts, 0);
    },
    pointsAllocated() {
      return this.selected.reduce((total, item) => (total + item.points), 0);
    },
    availablePoints() {
      return this.spendingPoints - this.pointsAllocated;
    },
    points() {
      return {
        spendable: this.spendingPoints,
        allocated: this.pointsAllocated,
        available: this.availablePoints,
      };
    },
  },
  methods: {
    toggleSelection(toy) {
      if (!this.isSelected(toy)) {
        this.selected.push(toy);
      } else {
        this.selected.splice(this.selected.indexOf(toy), 1);
      }
    },
    isSelected(toy) {
      return this.selected.indexOf(toy) !== -1;
    },
    processSelection() {
      this.dialog.title = '¿Estás seguro?';
      this.dialog.contents = 'Ya no puede cambiar los juguetes elegidos después de presionar "sí".';
      if (this.availablePoints > 0) {
        this.dialog.contents = `No has gastado todos tus puntos. ${this.dialog.contents}`;
      }
      this.dialog.visible = true;
    },
    proceed() {
      this.dialog.visible = false;
    },
  },
  meteor: {
    // Subscriptions - Errors not reported spelling and capitalization.
    $subscribe: {
      Sessions: [],
    },
    session () {
      if (this.sessionId && this.$subReady.Sessions) {
        return Sessions.findOne(new Mongo.ObjectID(this.sessionId));
      }
      return null;
    },
  },
};
</script>
