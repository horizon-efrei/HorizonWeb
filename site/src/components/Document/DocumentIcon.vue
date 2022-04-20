<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 289.77 383.55">
        <path
            class="a"
            d="M452.55,173h0c.07,1.74.06,3.53.06,5.28,0,72,.15,144.09-.1,216.14-.07,20.87-11.17,35.32-29.25,44.73-4.58,2.38-9.88,2-14.84,2.93a3.81,3.81,0,0,1-.67.07H207.25a3.35,3.35,0,0,1-.89-.12c-3.5-.87-7.16-.77-10.65-1.82-8.64-2.6-15.42-7.91-21-14.72a50.18,50.18,0,0,1-11.79-33q.25-142.87-.05-285.75c0-16.18,11.83-38.47,32.63-46,4.94-1.79,10.23-2,15.41-2q64.52-.14,129-.05l3.27,0"
            transform="translate(-162.88 -58.62)"
            :class="colors(mime).primaryColor"
        />
        <path
            class="b"
            d="M343.22,58.62c2.23,1.11,3.61,3.14,5.25,4.86q51.11,53.31,102.15,106.66c.7.73,1.32,1.53,2,2.29H350.18c-6.61,0-6.85-.24-6.85-6.82Q343.27,112.11,343.22,58.62Z"
            transform="translate(-162.88 -58.62)"
            :class="colors(mime).secondaryColor"
        />
        <foreignObject x="0" y="180" width="289.77" height="100">
            <div
                class="flex justify-center items-center w-full h-full text-8xl font-black text-white uppercase cursor-default"
            >
                {{ fileName.split('.').pop() }}
            </div>
        </foreignObject>
    </svg>
</template>

<script setup>
    defineProps({
        fileName: {
            default: '',
            type: String,
        },
        mime: {
            default: '',
            type: String,
        },
    })

    function colors(mime) {
        const dic = [
            {
                cond: new RegExp(
                    '^(application/vnd.ms-excel|application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|application/vnd.oasis.opendocument.spreadsheet|application/vnd.oasis.opendocument.spreadsheet-template)',
                ),
                secondaryColor: 'fill-green-700',
                primaryColor: 'fill-green-600',
            },
            {
                cond: new RegExp(
                    '^(application/vnd.openxmlformats-officedocument.wordprocessingml.document|application/msword|application/vnd.oasis.opendocument.text|application/vnd.oasis.opendocument.text-template)',
                ),
                secondaryColor: 'fill-blue-700',
                primaryColor: 'fill-blue-600',
            },
            {
                cond: new RegExp(
                    '^(application/vnd.ms-powerpoint|application/vnd.openxmlformats-officedocument.presentationml.presentation|application/vnd.oasis.opendocument.presentation|application/vnd.oasis.opendocument.presentation-template)',
                ),
                secondaryColor: 'fill-orange-700',
                primaryColor: 'fill-orange-600',
            },
            {
                cond: new RegExp('^application/pdf'),
                secondaryColor: 'fill-red-700',
                primaryColor: 'fill-red-600',
            },
            {
                cond: new RegExp('^image/(.)+'),
                secondaryColor: 'fill-teal-700',
                primaryColor: 'fill-teal-600',
            },
            {
                cond: new RegExp('^audio/(.)+'),
                secondaryColor: 'fill-purple-700',
                primaryColor: 'fill-purple-600',
            },
            {
                cond: new RegExp('^text/(.)+'),
                secondaryColor: 'fill-yellow-700',
                primaryColor: 'fill-yellow-600',
            },
            {
                cond: new RegExp('^video/(.)+'),
                secondaryColor: 'fill-purple-700',
                primaryColor: 'fill-purple-600',
            },
            {
                cond: new RegExp('^application/(.)+'),
                primaryColor: 'fill-gray-500',
                secondaryColor: 'fill-gray-400',
            },
        ]
        for (const el of dic) {
            if (el.cond.test(mime)) {
                return { primaryColor: el.primaryColor, secondaryColor: el.secondaryColor }
            }
        }
        return { primaryColor: 'fill-gray-500', secondaryColor: 'fill-gray-400' }
    }
</script>
