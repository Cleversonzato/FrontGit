import { mount } from '@vue/test-utils'
import app from '@/App.vue'

describe('Pagina inicial/ App', () => {

    describe('app', () => {
      
      it('has a created hook', () => {
        expect(typeof app).toBe('object')
        expect(app.name).toBe('App')
      })

      it('clicar em buscar ou histórico', async () => {
        const teste = mount(app)

        const btnH = teste.find('#btnHistorico')
        await btnH.trigger("click")
        expect(teste.html()).toContain('<div id="templateHistorico">')
        const btnB = teste.find('#btnBusca')
        await btnB.trigger("click")
        expect(teste.html()).toContain('<div id="templateBusca">')
      })

  })
})
