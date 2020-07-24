import { getMenuPaths } from '../menusHandler'

describe('MenusHandler', () => {
  describe('getMenuPaths', () => {
    it('empty', () => {
      expect(
        getMenuPaths(
          { id: 0, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
          []
        )
      ).toEqual([])
    })

    it('level 1', () => {
      expect(
        getMenuPaths(
          { id: 1, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
          [
            { id: 3, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
            { id: 2, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
            { id: 1, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
          ]
        )
      ).toEqual([
        { id: 1, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
      ])
    })

    it('level 2', () => {
      const menus = [
        { id: 1, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
        {
          id: 2,
          icon: 'false',
          systemId: 0,
          name: '',
          pid: 0,
          url: '',
          children: [
            {
              id: 3,
              icon: 'false',
              systemId: 0,
              name: '',
              pid: 0,
              url: '',
            },
            {
              id: 4,
              icon: 'false',
              systemId: 0,
              name: '',
              pid: 0,
              url: '',
            },
            {
              id: 5,
              icon: 'false',
              systemId: 0,
              name: '',
              pid: 0,
              url: '',
            },
          ],
        },
      ]
      expect(
        getMenuPaths(
          { id: 4, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
          menus
        )
      ).toEqual([
        menus[1],
        { id: 4, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
      ])
    })

    it('level 3', () => {
      const menus = [
        { id: 1, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
        {
          id: 2,
          icon: 'false',
          systemId: 0,
          name: '',
          pid: 0,
          url: '',
          children: [
            {
              id: 3,
              icon: 'false',
              systemId: 0,
              name: '',
              pid: 0,
              url: '',
            },
            {
              id: 4,
              icon: 'false',
              systemId: 0,
              name: '',
              pid: 0,
              url: '',
              children: [
                {
                  id: 5,
                  icon: 'false',
                  systemId: 0,
                  name: '',
                  pid: 0,
                  url: '',
                },
                {
                  id: 6,
                  icon: 'false',
                  systemId: 0,
                  name: '',
                  pid: 0,
                  url: '',
                },
                {
                  id: 7,
                  icon: 'false',
                  systemId: 0,
                  name: '',
                  pid: 0,
                  url: '',
                },
              ],
            },
          ],
        },
      ]
      expect(
        getMenuPaths(
          { id: 7, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
          menus
        )
      ).toEqual([
        menus[1],
        menus[1]?.children?.[1],
        { id: 7, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
      ])
    })
  })
})
