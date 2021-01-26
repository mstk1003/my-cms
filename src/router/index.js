import Vue from 'vue';
import VueRouter from 'vue-router';

import DialyTemplate from '../components/templates/DialyTemplate'
import DialyViewer from '../components/organisms/DialyViewer'
import DialyEditor from '../components/organisms/DialyEditor'
Vue.use(VueRouter);

const routes = [
  {
    path: '/dialy',
    redirect: { name: 'dialyViewer' },
    name: 'dialy',
    component: DialyTemplate,
    children: [
      {
        path: 'viewer',
        name: 'dialyViewer',
        component: DialyViewer,
        props: true
      },
      {
        path: 'editor/:clearContent',
        name: 'dialyEditor',
        component: DialyEditor,
        props: true
      }
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
    routes // `routes: routes` の短縮表記
  })

export default router;