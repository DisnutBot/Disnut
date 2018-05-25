'use strict';

var fs = require('fs');
var childProcess = require('child_process');

var fork = require('../meta/debugFork');
var paths = require('./paths');

var dirname = paths.baseDir;

function getRunningPid(callback) {
	fs.readFile(paths.pidfile, {
		encoding: 'utf-8',
	}, function (err, pid) {
		if (err) {
			return callback(err);
		}

		pid = parseInt(pid, 10);

		try {
			process.kill(pid, 0);
			callback(null, pid);
		} catch (e) {
			callback(e);
		}
	});
}

function start(options) {
	if (options.dev) {
		process.env.NODE_ENV = 'development';
		fork(paths.loader, ['--no-daemon', '--no-silent'], {
			env: process.env,
			cwd: dirname,
			stdio: 'inherit',
		});
		return;
	}
	if (options.log) {
		console.log('\n' + [
			'Starting Disnut with logging output'.bold,
			'Hit '.red + 'Ctrl-C '.bold + 'to exit'.red,
			'The Disnut process will continue to run in the background',
			'Use "' + './disnut stop'.yellow + '" to stop the Disnut server',
		].join('\n'));
	} else if (!options.silent) {
		console.log('\n' + [
			'Starting Disnut'.bold,
			'  "' + './disnut stop'.yellow + '" to stop the Disnut server',
			'  "' + './disnut log'.yellow + '" to view server output',
			'  "' + './disnut help'.yellow + '" for more commands\n'.reset,
		].join('\n'));
	}

	// Spawn a new Disnut process
	var child = fork(paths.loader, process.argv.slice(3), {
		env: process.env,
		cwd: dirname,
	});
	if (options.log) {
		childProcess.spawn('tail', ['-F', './logs/output.log'], {
			cwd: dirname,
			stdio: 'inherit',
		});
	}

	return child;
}

function stop() {
	getRunningPid(function (err, pid) {
		if (!err) {
			process.kill(pid, 'SIGTERM');
			console.log('Stopping Disnut. Goodbye!');
		} else {
			console.log('Disnut is already stopped.');
		}
	});
}

function restart(options) {
	getRunningPid(function (err, pid) {
		if (!err) {
			console.log('\nRestarting Disnut'.bold);
			process.kill(pid, 'SIGTERM');

			options.silent = true;
			start(options);
		} else {
			console.warn('Disnut could not be restarted, as a running instance could not be found.');
		}
	});
}

function status() {
	getRunningPid(function (err, pid) {
		if (!err) {
			console.log('\n' + [
				'Disnut Running '.bold + ('(pid ' + pid.toString() + ')').cyan,
				'\t"' + './disnut stop'.yellow + '" to stop the Disnut server',
				'\t"' + './disnut log'.yellow + '" to view server output',
				'\t"' + './disnut restart'.yellow + '" to restart Disnut\n',
			].join('\n'));
		} else {
			console.log('\nDisnut is not running'.bold);
			console.log('\t"' + './Disnut start'.yellow + '" to launch the Disnut server\n'.reset);
		}
	});
}

function log() {
	console.log('\nHit '.red + 'Ctrl-C '.bold + 'to exit\n'.red + '\n'.reset);
	childProcess.spawn('tail', ['-F', './logs/output.log'], {
		cwd: dirname,
		stdio: 'inherit',
	});
}

exports.start = start;
exports.stop = stop;
exports.restart = restart;
exports.status = status;
exports.log = log;
