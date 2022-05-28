export const middlewareManager = (middlewares, context, executionType) => {
    const byAuto = (index, next) => {
        middlewares[index]()
        next(index + 1)
    }
    
    const byNext = (index, next) => {
        const ctx = Object.values(context)
        middlewares[index](...ctx, () => next(index + 1))
    }

    const executeSequenceAccordingType = (type = 'automatic') => ({
        'automatic': byAuto,
        'next': byNext
    })[type]

    const execute = (index) => {
        if( middlewares && index < middlewares.length) {
            executeSequenceAccordingType(executionType)(index, execute)
        }
    }
    execute(0)
}