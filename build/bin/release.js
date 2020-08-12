/**
 * Created by admin on 2020/8/12.
 */
const { exec } = require('shelljs')
const inquirer = require('inquirer')

inquirer.prompt([
    {
        type: 'list',
        name: 'selected',
        message: '请选择版本升级类型',
        choices: [
            'major',
            {
                name: '大版本更新',
                disabled: '较大版本更新时选择此项'
            },
            'minor',
            {
                name: '小版本更新',
                disabled: '较小版本更新时选择此项'
            },
            'patch',
            {
                name: '更新补丁',
                disabled: '修复bug选择此项'
            },
            new inquirer.Separator(),
            'cover',
            {
                name: '覆盖当前版本',
                disabled: '危险操作！请勿覆盖线上运行版本！'
            },
            new inquirer.Separator(),
        ]
    }
]).then(answer => {
    if (answer.selected === 'cover') {
        exec(`npm run build:publish`)
    } else {
        exec(`npm version ${answer.selected} && npm run build:publish`)
    }
})