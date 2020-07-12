import { mount } from '@vue/test-utils'
import historico from '@/components/historico.vue'

describe('Pagina de Resultados', () => {

    describe('historico', () => {

      it('has a created hook', () => {
        expect(typeof historico).toBe('object')
        expect(historico.name).toBe('Historico')
        })

      it('Tem resultados', () => {
        const teste = mount(historico, {
              data (){
                return {
                  repositorios:[
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
                  ],
                  idSelecionado: '',
                  buscas:[]
                }
              }
      })

      expect(teste.html()).toContain('<td>0º</td>')
      })



  })
})
