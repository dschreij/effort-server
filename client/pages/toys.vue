<template>
  <v-container
    grid-list-lg
    fill-height
  >
    <v-layout
      v-if="!$subReady.Sessions || !session"
      column
      justify-center
      fill-height
      align-center
    >
      <div
        v-if="!$subReady.Sessions"
        class="text-center"
      >
        <v-progress-circular
          size="100"
          width="10"
          color="primary"
          indeterminate
        />
        <h1 class="font-weight-light text--primary mt-5">
          Cargando. Por favor espera.
        </h1>
      </div>
      <v-layout
        v-else-if="!session"
        shrink
        align-center
      >
        <v-icon
          color="warning"
          size="50"
        >
          mdi-alert
        </v-icon>&nbsp;&nbsp;&nbsp;<h1 class="font-weight-light primary--text">
          Sesión no encontrada! Por favor llame a un supervisor.
        </h1>
      </v-layout>
    </v-layout>
    <v-layout
      v-else-if="session.toys && session.toys.length"
      justify-center
      align-center
    >
      <v-icon
        color="success"
        size="100"
      >
        mdi-check
      </v-icon>&nbsp;&nbsp;&nbsp;<h1 class="font-weight-light primary--text">
        Gracias por elegir los juguetes. Por favor espera.
      </h1>
    </v-layout>
    <div v-else>
      <v-layout wrap>
        <v-flex
          xs12
          xl8
          offset-xl2
          text-center
        >
          <h1 class="font-weight-light pb-4">
            Selección de juguetes
          </h1>
          <p>
            ¡Hola {{ session.first_name }} {{ session.last_name1 }} {{ session.last_name2 }}!
            Escoge los juguetes que prefieras teniendo en cuenta los puntos que tienes.
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
    </div>
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
            No
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
import { toys } from '../data';

export default {
  components: { ToyChoice, ToySelection },
  data() {
    return {
      toys,
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
      this.dialog.contents = 'No podrás cambiar los juguetes elegidos después de presionar "sí".';
      if (this.availablePoints > 0) {
        this.dialog.contents = `No también has gastado todos tus puntos. ${this.dialog.contents}`;
      }
      this.dialog.visible = true;
    },
    proceed() {
      this.dialog.visible = false;
      Meteor.call('saveToySelection', {
        session: this.session,
        toys: this.selected.map((item) => item.name),
      });
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
  metaInfo: {
    title: 'Juguetes',
  }
};
</script>
