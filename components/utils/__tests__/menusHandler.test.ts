import { getMenuPaths } from '../menusHandler'

describe('MenusHandler', () => {
  describe('getMenuPaths', () => {
    it('empty', () => {
      expect(getMenuPaths('', [])).toEqual([])
    })

    it('level 1', () => {
      expect(
        getMenuPaths('/123', [
          { id: 3, icon: 'false', systemId: 0, name: '', pid: 0, url: '/123' },
          { id: 2, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
          { id: 1, icon: 'false', systemId: 0, name: '', pid: 0, url: '' },
        ])
      ).toEqual([
        { id: 3, icon: 'false', systemId: 0, name: '', pid: 0, url: '/123' },
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
              url: '/123',
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
      expect(getMenuPaths('/123', menus)).toEqual([
        menus[1],
        {
          id: 4,
          icon: 'false',
          systemId: 0,
          name: '',
          pid: 0,
          url: '/123',
        },
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
                  url: '/123',
                },
              ],
            },
          ],
        },
      ]
      expect(getMenuPaths('/123', menus)).toEqual([
        menus[1],
        menus[1]?.children?.[1],
        {
          id: 7,
          icon: 'false',
          systemId: 0,
          name: '',
          pid: 0,
          url: '/123',
        },
      ])
    })

    it('level 3 - 1', () => {
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
              url: '/123',
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
      expect(getMenuPaths('/123', menus)).toEqual([
        menus[1],
        {
          id: 3,
          icon: 'false',
          systemId: 0,
          name: '',
          pid: 0,
          url: '/123',
        },
      ])
    })
  })
})
