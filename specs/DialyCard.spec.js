import Component from '@/components/organisms/DialyCard.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from "vuetify"


describe('Diary Card',() => {
    // localVue.use(Vuetify)

    // const localVue = createLocalVue()
    // let vuetify

    // beforeEach(() => {
    //     vuetify = new Vuetify()
    // })
    const wrapper = shallowMount(Component)
    test('mount a vue component', () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })
})

