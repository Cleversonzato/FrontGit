import { mount } from '@vue/test-utils'
import resultado from '@/components/resultado.vue'

describe('Pagina de Resultados', () => {

    describe('resultado', () => {

      it('has a created hook', () => {
        expect(typeof resultado).toBe('object')
        expect(resultado.name).toBe('Resultado')
      })

      it('Tem resultados', () => {
        const teste = mount(resultado, {
          propsData: {
            repositorios: [
              {
                id: 0,
                posicao: 0,
                nome: 'a',
                href: 'h',
                estrelas: 0
              },{
                id: 1,
                posicao: 2,
                nome: 'ab',
                href: 'ht',
                estrelas: 1
              }
            ]
          }
        })
        expect(teste.html()).toContain('<td>0º</td>')
      })

  })
})
