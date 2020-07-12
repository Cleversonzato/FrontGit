import { mount } from '@vue/test-utils'
import busca from '@/components/busca.vue'

describe('Pagina de Busca', () => {

    describe('busca', () => {

      it('has a created hook', () => {
        expect(typeof busca).toBe('object')
        expect(busca.name).toBe('Busca')
      })

      it('Texto do botão de busca', async () => {
        const teste = mount(busca)

        const inpL = teste.find('#linguagem')
        await inpL.trigger('keydown', {  key: 'a' })
        const inpN = teste.find('#numero')
        await inpN.trigger('keydown', {  key: '1' })
        expect(teste.html()).toContain('<div id="templateBusca">')
      })


  })
})
