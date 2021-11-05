import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from '@/pages/Landing.vue'

const routes = [
  {
    path: '/',
    component: Landing
  },
  {
    path: '/info',
    component: Landing
  },
  {
    path: '/rgpd',
    component: Landing
  },
  {
    path: '/horizon',
    component: Landing
  },
  {
    path: '/post/:id',
    component: () => import('@/pages/Post/ThreadCompactView.vue'),
    props: {
      post: {
        views: 194,
        createdAt: '2021-02-04T13:51:36.631Z',
        updatedAt: '2021-03-04T13:51:36.631Z',
        post: {
          number: 194,
          upvotes: 69,
          title: 'Les ordinateurs sur la deuxième rangée en salle E103 ne fonctionnent plus !',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nihil reprehenderit esse aperiam odit dignissimos, praesentium quia blanditiis autem atque molestias officiis deleniti magnam libero a? Optio recusandae totam soluta! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit optio, praesentium obcaecati facere quasi',
          creator: {
            pseudo: 'Pseudo',
            role: 'Rôle',
            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
          },
          responses: [{
            author: 'Pseudo',
            content: 'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
            likes: '185'
          },
          {
            author: 'Pseudo',
            content: 'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
            likes: '185'
          },
          {
            author: 'Pseudo',
            content: 'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
            likes: '185'
          }]
        },
        responses: [{
          upvotes: 69,
          title: 'Les ordinateurs sur la deuxième rangée en salle E103 ne fonctionnent plus !',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nihil reprehenderit esse aperiam odit dignissimos, praesentium quia blanditiis autem atque molestias officiis deleniti magnam libero a? Optio recusandae totam soluta! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit optio, praesentium obcaecati facere quasi',
          creator: {
            pseudo: 'Pseudo',
            role: 'Role',
            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
          },
          responses: [{
            author: 'Pseudo',
            content: 'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
            likes: 185
          },
          {
            author: 'Pseudo',
            content: 'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
            likes: 185
          },
          {
            author: 'Pseudo',
            content: 'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
            likes: 185
          }]
        },
        {
          upvotes: 69,
          title: 'Les ordinateurs sur la deuxième rangée en salle E103 ne fonctionnent plus !',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nihil reprehenderit esse aperiam odit dignissimos, praesentium quia blanditiis autem atque molestias officiis deleniti magnam libero a? Optio recusandae totam soluta! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit optio, praesentium obcaecati facere quasi',
          creator: {
            pseudo: 'Pseudo',
            role: 'Role',
            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
          },
          responses: [{
            author: 'Pseudo',
            content: 'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
            likes: 185
          },
          {
            author: 'Pseudo',
            content: 'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
            likes: 1851
          },
          {
            author: 'Pseudo',
            content: 'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
            likes: 185
          }]
        }],
        tags: [
          {
            title: 'TagExample',
            color: 'blue-500'
          },
          {
            title: 'OneTag',
            color: 'red-500'
          },
          {
            title: 'Tags',
            color: 'pink-500'
          },
          {
            title: 'Example',
            color: 'orange-500'
          }
        ],
        similarTopics: [
          {
            number: 173,
            title: 'Probleme dans la salle 7',
            tags: [
              {
                title: 'Tag',
                color: 'blue-500'
              },
              {
                title: 'Tag',
                color: 'blue-500'
              },
              {
                title: 'Tag',
                color: 'blue-500'
              }
            ]
          },
          {
            number: 173,
            title: 'Probleme de professeur',
            tags: [
              {
                title: 'Tag',
                color: 'blue-500'
              },
              {
                title: 'Tag',
                color: 'blue-500'
              },
              {
                title: 'Tag',
                color: 'red-500'
              }
            ]
          },
          {
            number: 173,
            title: 'Probleme dans la salle 7',
            tags: [
              {
                title: 'Tag',
                color: 'blue-500'
              },
              {
                title: 'Tag',
                color: 'blue-500'
              },
              {
                title: 'Tag',
                color: 'blue-500'
              }
            ]
          }
        ],
        contributors: [
          {
            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
            pseudo: 'Pseudo1'
          },
          {
            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
            pseudo: 'Pseudo2'
          },
          {
            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
            pseudo: 'Pseudo3'
          },
          {
            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
            pseudo: 'Pseudo4'
          }
        ]
      }
    }
  },

  {
    path: '/new-post',
    component: () => import('@/pages/Post/PostNew.vue')
  },

  {
    path: '/dashboard',
    component: () => import('@/pages/AdminSide.vue')
  },

  {
    path: '/file-upload',
    component: () => import('@/pages/FileUpload.vue')
  },

  {
    path: '/posts',
    component: () => import('@/pages/Post/PostList.vue')
  },

  {
    path: '/filler',
    component: () => import('@/pages/Filler.vue')
  },

  {
    path: '/my-account',
    component: () => import('@/pages/Settings.vue')
  },

  {
    path: '/secret',
    component: () => import('@/pages/Filler.vue'),
    beforeEnter: (to, from, next) => {
      // ...
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
