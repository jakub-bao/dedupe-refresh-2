//@ts-ignore

expect.extend({toBeAround(userCount, expectedUserCount){
    const accuracy = 0.1;
    let isSmaller = userCount < expectedUserCount*(1+accuracy);
    let isGreater = userCount > expectedUserCount*(1-accuracy);
    let message = `Found user count ${userCount} should be within 10% range of expected user count ${expectedUserCount}`;
    return {pass: isSmaller && isGreater , message: ()=>message}
}});