import { execa } from 'execa';
import prompts from 'prompts';
import scriptPkg from '../package.json';
import rootPkg from '../../package.json';

type WorkspacePackage = { name: string; version?: string; path: string }

async function getPackages() {
  const { stdout } = await execa('pnpm', [
    'ls',
    '-r',
    '--depth',
    '-1',
    '--json',
  ])

  return (JSON.parse(stdout) as WorkspacePackage[]).filter(
    (p) =>
      p.name !== scriptPkg.name &&
      p.name !== rootPkg.name &&
      p.name.startsWith('@projects')
  )
}

async function runScript(pkg: WorkspacePackage, script: string) {
  execa('pnpm', ['--filter', `${pkg.name}`, '--parallel', 'run', script], {
    stdio: 'inherit',
    preferLocal: true,
  })
}

async function runSingleScript(pkg: WorkspacePackage, script: string) {
  execa('pnpm', ['--filter', `${pkg.name}`, script], {
    stdio: 'inherit',
    preferLocal: true,
  })
}

export async function run(command: string) {
  const main = async () => {
    const packages = await getPackages();
    if (!packages.length) {
      return
    }

    if (packages.length === 1) {
      runSingleScript(packages[0], command)
      return
    }

    const { name } = await prompts([
      {
        name: 'name',
        message: `Choose the package to run ${command} script`,
        type: 'select',
        choices: packages.map((p) => {
          return {
            title: p.name,
            value: p.name,
          }
        }),
      },
    ])

    runScript(
      packages.find((p) => p.name === name),
      command,
    )
  }

  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
