<template>
    <!-- // todo all this is temporary -->
    <div
        class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
        px-10 pt-12 pb-10 sm:px-10 sm:pt-6 sm:pb-4 mx-auto card
        centered-fixed z-50 bg-2"
        @click.stop="() => {}"
    >
        <ThreadCompactView :thread="thread" />
    </div>
</template>
<script>
import ThreadCompactView from '@/views/Post/ThreadCompactView.vue'
export default {
    components: { ThreadCompactView },
    // todo data is not corresponding to each rows
    data () {
        return {
            thread: {
                views: 194,
                createdAt: '2021-02-04T13:51:36.631Z',
                updatedAt: '2021-03-04T13:51:36.631Z',
                post: {
                    number: 194,
                    upvotes: 69,
                    title:
            'Les ordinateurs sur la deuxième rangée en salle E103 ne fonctionnent plus !',
                    content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nihil reprehenderit esse aperiam odit dignissimos, praesentium quia blanditiis autem atque molestias officiis deleniti magnam libero a? Optio recusandae totam soluta! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit optio, praesentium obcaecati facere quasi',
                    creator: {
                        pseudo: 'Pseudo',
                        role: 'Rôle',
                        img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                    },
                    comments: [
                        {
                            author: 'Pseudo',
                            content:
                'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
                            likes: '185'
                        },
                        {
                            author: 'Pseudo',
                            content:
                'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
                            likes: '185'
                        },
                        {
                            author: 'Pseudo',
                            content:
                'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
                            likes: '185'
                        }
                    ]
                },
                replies: [
                    {
                        upvotes: 69,
                        title:
              'Les ordinateurs sur la deuxième rangée en salle E103 ne fonctionnent plus !',
                        content:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nihil reprehenderit esse aperiam odit dignissimos, praesentium quia blanditiis autem atque molestias officiis deleniti magnam libero a? Optio recusandae totam soluta! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit optio, praesentium obcaecati facere quasi',
                        creator: {
                            pseudo: 'Pseudo',
                            role: 'Role',
                            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                        },
                        comments: [
                            {
                                author: 'Pseudo',
                                content:
                  'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
                                likes: 185
                            },
                            {
                                author: 'Pseudo',
                                content:
                  'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
                                likes: 185
                            },
                            {
                                author: 'Pseudo',
                                content:
                  'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
                                likes: 185
                            }
                        ]
                    },
                    {
                        upvotes: 69,
                        title:
              'Les ordinateurs sur la deuxième rangée en salle E103 ne fonctionnent plus !',
                        content:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nihil reprehenderit esse aperiam odit dignissimos, praesentium quia blanditiis autem atque molestias officiis deleniti magnam libero a? Optio recusandae totam soluta! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit optio, praesentium obcaecati facere quasi',
                        creator: {
                            pseudo: 'Pseudo',
                            role: 'Role',
                            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                        },
                        responses: [
                            {
                                author: 'Pseudo',
                                content:
                  'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
                                likes: 185
                            },
                            {
                                author: 'Pseudo',
                                content:
                  'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
                                likes: 1851
                            },
                            {
                                author: 'Pseudo',
                                content:
                  'Neque iudicantibus lacrimae maestitia filium maeror certe quod iudicantibus autem parentis .',
                                likes: 185
                            }
                        ]
                    }
                ],
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
    }
}
</script>
