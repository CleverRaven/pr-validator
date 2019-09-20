"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const description_regex = core.getInput('description-regex');
            const description_regex_flags = core.getInput('description-regex-flags', { required: false });
            core.debug(`Applying ${description_regex} to description string.`);
            const description = github.context.payload.pull_request.body;
            console.log(`PR Description: ${description}`);
            if (!description.match(new RegExp(description_regex, description_regex_flags))) {
                core.setFailed(`Please fix your PR SUMMARY line to match ${description_regex}`);
            }
            else {
                console.log('PR description contains valid SUMMARY line.');
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
